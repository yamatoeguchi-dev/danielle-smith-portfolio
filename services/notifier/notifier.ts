
/**
 * Abstract Notifier class defining the interface for notification services.
 *
 */
export abstract class Notifier {
    protected config: any;

    /**
     * Constructor for the Notifier class.
     *
     * @param config - Configuration object for the notifier service.
     */
    constructor(config: any) {
        this.config = config;
    }

    /**
     * Sends a notification with the given message.
     *
     * @param recipients - Array of recipient email addresses.
     * @param body - The message to be sent in the notification.
     * @returns A promise that resolves when the notification is sent.
     */
    abstract sendNotification(recipients: Array<string>, body: string, subject?: string) : Promise<void>;
}