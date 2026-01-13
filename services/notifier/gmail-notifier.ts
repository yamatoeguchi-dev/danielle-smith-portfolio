import nodemailer from 'nodemailer';

import { Notifier } from './notifier';

/**
 * GmailNotifier class implementing the Notifier interface for Gmail notifications.
 *
 */
export class GmailNotifier extends Notifier {
    /**
     * Constructor for the GmailNotifier class.
     *
     * @param config - Configuration object for the Gmail notifier service.
     */
    constructor(config: any) {
        super(config);
    }

    /**
     * Sends a notification via Gmail with the given message.
     *
     * @param recipients - Array of recipient email addresses.
     * @param message - The message to be sent in the notification.
     * @returns A promise that resolves when the notification is sent.
     */
    async sendNotification(recipients: Array<string>, subject: string, body: string): Promise<void> {
        const transporter = nodemailer.createTransport({
            host: this.config.smtpServer,
            port: this.config.smtpPort,
            secure: false,
            auth: {
                user: this.config.fromEmail,
                pass: this.config.googleAppPassword,
            }
        })

        for (const toEntity of recipients) {
            const message = {
                from: this.config.fromEmail,
                to: toEntity,
                subject: subject,
                html: body,
            }

            try {
                await transporter.sendMail(message);
                console.log(`Gmail notification sent to ${toEntity}`);
            } catch (error) {
                console.error(`Failed to send Gmail notification to ${toEntity}:`, error);
            }
        }

        transporter.close();
    }
}