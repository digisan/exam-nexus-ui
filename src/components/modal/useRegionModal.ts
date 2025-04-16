// composables/useRegionModal.ts
import { h, render } from 'vue';
import RegionModal from './RegionModal.vue';

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

            render(
                h(RegionModal, {
                    show: true,
                    countries,
                    onConfirm,
                    onCancel,
                }),
                container);
        });
    };
}
