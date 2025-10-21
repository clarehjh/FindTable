import { onMounted, onUnmounted } from "vue";

/**
 * 防抖函数
 * @param fn 要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
function debounce(fn: () => void, delay: number = 200) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn();
      timeoutId = null;
    }, delay);
  };
}

/**
 * 监听屏幕尺寸变化的钩子
 * @param onResize 当屏幕尺寸变化时触发的回调函数
 */
export function useScreenSize(onResize: () => void) {
  const debouncedResizeHandler = debounce(onResize, 200);

  const handleResize = () => {
    debouncedResizeHandler();
  };

  // 在组件挂载时添加事件监听器
  onMounted(() => {
    window.addEventListener("resize", handleResize);
  });

  // 在组件卸载时移除事件监听器
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });
}
