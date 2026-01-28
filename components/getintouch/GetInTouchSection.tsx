'use client';

import React from 'react';

export const GetInTouchSection: React.FC = () => {
    return (
        <section className="w-full py-24 px-6 bg-neutral-900 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
                <p className="text-lg text-neutral-300 mb-10">
                    Have a project in mind or just want to say hi? Let’s talk.
                </p>

                <a
                    href="mailto:hello@example.com"
                    className="inline-block rounded-full bg-white text-black px-8 py-3 font-semibold hover:opacity-90 transition"
                >
                    Contact Me
                </a>
            </div>
        </section>
    );
};
