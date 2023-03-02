<template>
	<div class="shape" :class="{ active }" :data-index="index" @mousedown.stop="handleMove">
		<div
			v-for="item in isActive() ? pointList : []"
			:key="item"
			class="shape_point"
			:style="getPointStyle(item)"
			@mousedown.stop="handleMouseDownOnPoint(item, $event)"
		></div>
		<slot></slot>
	</div>
</template>

<script>
import { mod360 } from '@/utils/util.js';

export default {
	inject: ['contain', 'canvasId'],
	props: {
		width: {
			default: 100,
			type: [String, Number],
		},
		height: {
			default: 100,
			type: [String, Number],
		},
		active: {
			default: false,
			type: Boolean,
		},
		index: {
			default: '',
			type: String,
		},
	},
	data() {
		return {
			pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'], // 八个方向
			pointList2: ['r', 'l'], // 左右两个方向
			// 每个点对应的初始角度
			initialAngle: {
				lt: 0,
				t: 45,
				rt: 90,
				r: 135,
				rb: 180,
				b: 225,
				lb: 270,
				l: 315,
			},
			// 每个范围的角度对应的光标
			angleToCursor: [
				{ start: 338, end: 23, cursor: 'nw' },
				{ start: 23, end: 68, cursor: 'n' },
				{ start: 68, end: 113, cursor: 'ne' },
				{ start: 113, end: 158, cursor: 'e' },
				{ start: 158, end: 203, cursor: 'se' },
				{ start: 203, end: 248, cursor: 's' },
				{ start: 248, end: 293, cursor: 'sw' },
				{ start: 293, end: 338, cursor: 'w' },
			],
			cursors: {},
		};
	},
	methods: {
		handleMouseDownOnPoint(point, e) {
			let { attr, left, top } = this.contain.activeObj;
			let { width, height } = attr;
			const startX = e.clientX;
			const startY = e.clientY;
			let _this = this;
			document.onmousemove = function (moveEvent) {
				const currX = moveEvent.clientX;
				const currY = moveEvent.clientY;
				const disY = currY - startY;
				const disX = currX - startX;
				const hasT = /t/.test(point);
				const hasB = /b/.test(point);
				const hasL = /l/.test(point);
				const hasR = /r/.test(point);
				const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
				const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
				const newLeft = left + (hasL ? disX : 0);
				const newTop = top + (hasT ? disY : 0);

				_this.contain.activeAttr.width = newWidth > 0 ? newWidth : 0;
				_this.contain.activeAttr.height = newHeight > 0 ? newHeight : 0;
				_this.contain.activeObj.left = newLeft;
				_this.contain.activeObj.top = newTop;
			};
			document.onmouseup = function () {
				document.onmousemove = null;
				document.onmouseup = null;
			};
		},
		handleMove(event) {
			this.contain.activeIndex = this.index;
			if (this.contain.activeObj.isLock) return;
			let target = '';
			let ele = document.querySelectorAll('.shape');
			for (let i = 0; i < ele.length; i++) {
				if (ele[i].dataset.index === this.contain.activeIndex) {
					target = ele[i];
					break;
				}
			}
			let bounds = this.mouseBounds(event, target.getBoundingClientRect(), this.canvasId().getBoundingClientRect());
			let _this = this;
			this.cursors = this.getCursor();

			document.onmousemove = function (e) {
				const left = (e.x > bounds.left && e.x < bounds.right ? e.x : e.x >= bounds.right ? bounds.right : bounds.left) - bounds.left;
				const top = (e.y > bounds.top && e.y < bounds.bottom ? e.y : e.y >= bounds.bottom ? bounds.bottom : bounds.top) - bounds.top;
				_this.contain.activeObj.left = left;
				_this.contain.activeObj.top = top;
				target.style.left = left + 'px';
				target.style.top = top + 'px';
				target.style.opacity = 0.9;
				target.style.cursor = 'move';
			};
			document.onmouseup = function () {
				document.onmousemove = null;
				document.onmouseup = null;
				target.style.opacity = 1;
				target.style.cursor = 'move';
			};
		},
		mouseBounds(pt, compRact, canvasRact) {
			return {
				left: canvasRact.left + (pt.x - compRact.left),
				right: canvasRact.right - (compRact.right - pt.x),
				top: canvasRact.top + (pt.y - compRact.top),
				bottom: canvasRact.bottom - (compRact.bottom - pt.y),
			};
		},
		isActive() {
			return this.active && !this.contain.activeObj.isLock;
		},
		getPointStyle(point) {
			const { width, height } = this;
			const hasT = /t/.test(point);
			const hasB = /b/.test(point);
			const hasL = /l/.test(point);
			const hasR = /r/.test(point);
			let newLeft = 0;
			let newTop = 0;

			// 四个角的点
			if (point.length === 2) {
				newLeft = hasL ? 0 : width;
				newTop = hasT ? 0 : height;
			} else {
				// 上下两边中间的点，宽度居中
				if (hasT || hasB) {
					newLeft = width / 2;
					newTop = hasT ? 0 : height;
				}
				// 左右两边中间的点，高度居中
				if (hasL || hasR) {
					newLeft = hasL ? 0 : width;
					newTop = Math.floor(height / 2);
				}
			}
			const style = {
				marginLeft: '-4px',
				marginTop: '-4px',
				left: `${newLeft}px`,
				top: `${newTop}px`,
				cursor: this.cursors[point],
			};

			return style;
		},
		getCursor() {
			const { angleToCursor, initialAngle, pointList } = this;
			// const rotate = mod360(curComponent.style.rotate); // 取余 360
			const result = {};
			let lastMatchIndex = -1; // 从上一个命中的角度的索引开始匹配下一个，降低时间复杂度
			pointList.forEach((point) => {
				const angle = mod360(initialAngle[point]);
				const len = angleToCursor.length;
				// eslint-disable-next-line no-constant-condition
				while (true) {
					lastMatchIndex = (lastMatchIndex + 1) % len;
					const angleLimit = angleToCursor[lastMatchIndex];
					if (angle < 23 || angle >= 338) {
						result[point] = 'nw-resize';
						return;
					}
					if (angleLimit.start <= angle && angle < angleLimit.end) {
						result[point] = angleLimit.cursor + '-resize';
						return;
					}
				}
			});
			return result;
		},
	},
};
</script>

<style lang="scss">
.shape {
	position: absolute;
	&:hover {
		cursor: move;
		background-color: rgba(115, 170, 229, 0.3);
		outline: 1px dashed #70c0ff;
	}
	&_point {
		position: absolute;
		background: #09f;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		z-index: 1;
	}
	.icon-xuanzhuan,
	.icon-unlock {
		position: absolute;
	}
	.icon-xuanzhuan {
		cursor: grab;
		top: -34px;
		left: 50%;
		transform: translateX(-50%);
		color: #59c7f9;
		&:active {
			cursor: grabbing;
		}
	}
	.icon-unlock {
		top: 0;
		right: 0;
	}
}
.active {
	user-select: none;
	outline: 1px dashed #70c0ff;
	background-color: rgba(115, 170, 229, 0.3);
}
</style>
