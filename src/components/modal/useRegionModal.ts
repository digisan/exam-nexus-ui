// composables/useRegionModal.ts
import { h, render } from 'vue';
import RegionModal from './RegionModal.vue';
import { app } from '../../main.ts'; // 👈 引入你创建的 app 实例

export function useRegionModal() {
    return (countries: any[]): Promise<string | null> => {
        return new Promise((resolve) => {
            const container = document.createElement('div');
            document.body.appendChild(container);

            const onConfirm = (region: string) => {
                resolve(region);
                cleanup();
            };

            const onCancel = () => {
                resolve(null);
                cleanup();
            };

            const cleanup = () => {
                render(null, container);
                container.remove();
            };

            const vnode = h(RegionModal, {
                show: true,
                countries,
                onConfirm,
                onCancel,
            })

            vnode.appContext = app._context // 👈 设置 appContext，使得 $t() 能访问
            render(vnode, container)
        });
    };
}
