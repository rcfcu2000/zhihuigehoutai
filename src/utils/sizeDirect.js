const map = new WeakMap();

const ob = ResizeObserver((entries) => {
    for (const entry of entries) {
        const handler = map.get(entry.target)
        handler && handler({
            width: entry.borderBoxSize[0].inlineSize,
            height: entry.borderBoxSize[0].blockSize,
        })
    }
})
ob.observe(dom);
export default {
    mounted(el, binding) {
        map.set(el,binding.value)
        ob.observe(el);
    },
    unmounted(el, binding) {
        ob.observe(el);
    }
}