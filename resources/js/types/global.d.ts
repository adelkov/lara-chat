import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';

declare global {
    interface Window {
        axios: AxiosInstance;
        Echo: any;
        Pusher: any;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;
}
