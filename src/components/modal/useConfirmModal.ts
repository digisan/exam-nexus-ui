// composables/useConfirmModal.ts
import { h, render } from 'vue';
import ConfirmModal from './ConfirmModal.vue';
import { app } from '../../main.ts'; // 👈 引入你创建的 app 实例

export function useConfirmModal() {
    return (message: string): Promise<boolean | null> => {
        return new Promise((resolve) => {
            const container = document.createElement('div');
            document.body.appendChild(container);

            const onConfirm = (confirm: boolean) => {
                resolve(confirm);
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

            const vnode = h(ConfirmModal, {
                show: true,
                message,
                onConfirm,
                onCancel,
            })

            vnode.appContext = app._context // 👈 设置 appContext，使得 $t() 能访问
            render(vnode, container)
        });
    };
}
