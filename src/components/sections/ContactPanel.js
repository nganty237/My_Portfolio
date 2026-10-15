import { contactInfo } from '../../data/profile.js'
import { Icon } from '../ui/Icon.js'

const inputClasses = 'mt-1.5 w-full rounded-md border border-border bg-surface-strong px-3 py-2.5 text-xs text-ink outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20'

export function ContactPanel() {
  return `
    <section class="mx-auto max-w-5xl px-6 pb-24 pt-12 md:pb-32 md:pt-16" aria-labelledby="contact-title">
      <div class="max-w-3xl" data-page-header>
        <p class="mb-3 text-[0.625rem] font-medium tracking-wide text-accent">GET IN TOUCH</p>
        <h1 class="m-0 font-display text-[2.5rem] font-normal leading-tight tracking-[-0.035em] text-ink md:text-[2.75rem]" id="contact-title">Let's start a conversation</h1>
        <p class="mt-3 max-w-2xl text-xs leading-5 text-muted md:text-[0.8125rem]">Have a role, a project or an idea in mind? I&rsquo;d love to hear about it.<br class="hidden sm:block" /> Let&rsquo;s talk about what we could build together.</p>
      </div>

      <div class="mt-8 grid gap-10 md:mt-7 md:grid-cols-2 md:gap-14">
        <aside class="pt-0 md:pt-1" aria-label="Contact information" data-contact-aside>
          ${contactInfo.map((item) => `
            <div class="border-b border-border py-3.5">
              ${item.label === 'AVAILABILITY'
                ? `<div class="grid gap-2"><span class="text-[0.625rem] font-medium tracking-wide text-muted">${item.label}</span><span class="inline-flex items-center gap-2 text-xs text-accent"><span class="size-1.5 rounded-full bg-accent" aria-hidden="true"></span>${item.value}</span></div>`
                : item.label === 'EMAIL'
                  ? `<div class="grid gap-2"><span class="text-[0.625rem] font-medium tracking-wide text-muted">${item.label}</span><span class="text-xs text-ink">[${item.value}] <span aria-hidden="true">&#8599;</span></span></div>`
                  : `<div class="grid gap-2"><span class="text-[0.625rem] font-medium tracking-wide text-muted">${item.label}</span><span class="text-xs text-ink">${item.value}</span></div>`}
            </div>
          `).join('')}
        </aside>

        <div>
          <h2 class="m-0 text-base font-semibold leading-6 text-ink">Send a Message</h2>
          <p class="mt-2 text-xs leading-5 text-muted">Tell me a little about your project or opportunity.</p>
          <form class="mt-4 space-y-3.5" data-contact-form novalidate>
            <div>
              <label class="text-xs font-medium text-ink" for="contact-name">Name <span aria-hidden="true">*</span></label>
              <input class="${inputClasses}" id="contact-name" name="name" type="text" autocomplete="name" placeholder="Your name" required aria-describedby="error-name" />
              <p class="mt-1 hidden text-xs text-red-700" id="error-name" data-error-for="name"></p>
            </div>
            <div>
              <label class="text-xs font-medium text-ink" for="contact-email">Email <span aria-hidden="true">*</span></label>
              <input class="${inputClasses}" id="contact-email" name="email" type="email" autocomplete="email" placeholder="Your email address" required aria-describedby="error-email" />
              <p class="mt-1 hidden text-xs text-red-700" id="error-email" data-error-for="email"></p>
            </div>
            <div>
              <label class="text-xs font-medium text-ink" for="contact-subject">Subject</label>
              <input class="${inputClasses}" id="contact-subject" name="subject" type="text" autocomplete="off" placeholder="What is this about?" />
            </div>
            <div>
              <label class="text-xs font-medium text-ink" for="contact-message">Message <span aria-hidden="true">*</span></label>
              <textarea class="${inputClasses} min-h-22 resize-y" id="contact-message" name="message" rows="4" placeholder="A few words about your idea..." required aria-describedby="error-message"></textarea>
              <p class="mt-1 hidden text-xs text-red-700" id="error-message" data-error-for="message"></p>
            </div>

            <div class="absolute -left-[10000px] top-auto size-px overflow-hidden" aria-hidden="true">
              <label for="contact-company">Leave this field empty</label>
              <input id="contact-company" name="company" type="text" tabindex="-1" autocomplete="off" />
            </div>

            <p class="hidden text-sm" data-form-status role="status" aria-live="polite" tabindex="-1"></p>
            <button class="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-neutral-950 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-ink focus:outline-2 focus:outline-offset-2 focus:outline-ink disabled:cursor-wait disabled:opacity-60" type="submit" data-submit-button>
              <span data-button-label>Send message</span>${Icon('arrow-up-right', { size: 16 })}
            </button>
          </form>
        </div>
      </div>
    </section>
  `
}

export default ContactPanel
