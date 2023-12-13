import { AxiosInstance } from 'axios';
import ziggyRoute, { Config as ZiggyConfig } from 'ziggy-js';
import Echo from 'laravel-echo';

declare global {
    interface Window {
        axios: AxiosInstance;
        Echo: Echo;
        Pusher: any;
    }

    var route: typeof ziggyRoute;
    var Ziggy: ZiggyConfig;
}
