const fs = require('fs');

// Contact Page
let contact = fs.readFileSync('src/app/[locale]/contact/page.tsx', 'utf8');
contact = contact.replace(
`            {content.contactOptions.items.length === 0 ? (
                <p className="text-gray-500 italic">No specific contact options listed.</p>
            ) : (`,
`            {content.contactOptions.items.length > 0 && (`
).replace(
`                </div>
            )}`,
`                </div>
            )}` // that part is fine
).replace(
`                            className="block p-6 border rounded-xl hover:shadow-md transition bg-white"`,
`                            className="block p-6 border rounded-xl hover:shadow-md transition bg-background border-border"`
).replace(
`                            <h3 className="text-xl font-bold mb-2">{item.platformName}</h3>
                            <p className="text-gray-600 mb-4">{item.description}</p>`,
`                            <h3 className="text-xl font-bold mb-2 text-foreground">{item.platformName}</h3>
                            <p className="text-subtle mb-4">{item.description}</p>`
);
fs.writeFileSync('src/app/[locale]/contact/page.tsx', contact);

// Resume Page
let resume = fs.readFileSync('src/app/[locale]/resume/page.tsx', 'utf8');
resume = resume.replace(
`                <h3 className="text-2xl font-bold border-b pb-2 mb-6">{content.experience.title}</h3>
                {content.experience.items.length === 0 ? (
                    <p className="text-gray-500 italic">No experience data available.</p>
                ) : (`,
`                {content.experience.items.length > 0 && (
                <>
                <h3 className="text-2xl font-bold border-b border-border text-heading pb-2 mb-6">{content.experience.title}</h3>`
).replace(
`                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="text-xl font-semibold">{item.role}</h4>
                                    <span className="text-sm text-gray-500">{item.dates}</span>
                                </div>
                                <h5 className="text-lg text-gray-700 mb-4">{item.companyName}</h5>
                                <ul className="list-disc pl-5 space-y-2 text-gray-600">`,
`                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="text-xl font-semibold text-foreground">{item.role}</h4>
                                    <span className="text-sm text-subtle">{item.dates}</span>
                                </div>
                                <h5 className="text-lg text-heading mb-4">{item.companyName}</h5>
                                <ul className="list-disc pl-5 space-y-2 text-subtle">`
).replace(
`                    </div>
                )}
            </section>`,
`                    </div>
                </>
                )}
            </section>`
);

resume = resume.replace(
`                <h3 className="text-2xl font-bold border-b pb-2 mb-6">{content.education.title}</h3>
                {content.education.items.length === 0 ? (
                    <p className="text-gray-500 italic">No education data available.</p>
                ) : (`,
`                {content.education.items.length > 0 && (
                <>
                <h3 className="text-2xl font-bold border-b border-border text-heading pb-2 mb-6">{content.education.title}</h3>`
).replace(
`                                <div>
                                    <h4 className="font-semibold">{item.degree}</h4>
                                    <p className="text-gray-600">{item.institution}</p>
                                </div>
                                <span className="text-sm text-gray-500">{item.dates}</span>`,
`                                <div>
                                    <h4 className="font-semibold text-foreground">{item.degree}</h4>
                                    <p className="text-subtle">{item.institution}</p>
                                </div>
                                <span className="text-sm text-subtle">{item.dates}</span>`
).replace(
`                    </div>
                )}
            </section>`,
`                    </div>
                </>
                )}
            </section>`
);

resume = resume.replace(
`                <h3 className="text-2xl font-bold border-b pb-2 mb-6">{content.skills.title}</h3>
                {content.skills.items.length === 0 ? (
                    <p className="text-gray-500 italic">No skills data available.</p>
                ) : (`,
`                {content.skills.items.length > 0 && (
                <>
                <h3 className="text-2xl font-bold border-b border-border text-heading pb-2 mb-6">{content.skills.title}</h3>`
).replace(
`                            <div key={i}>
                                <h4 className="font-semibold mb-3">{cat.category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skillsList.map((skill, j) => (
                                        <span key={j} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{skill}</span>`,
`                            <div key={i}>
                                <h4 className="font-semibold mb-3 text-heading">{cat.category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skillsList.map((skill, j) => (
                                        <span key={j} className="px-3 py-1 bg-muted border border-border text-subtle rounded-full text-sm">{skill}</span>`
).replace(
`                    </div>
                )}
            </section>`,
`                    </div>
                </>
                )}
            </section>`
);


fs.writeFileSync('src/app/[locale]/resume/page.tsx', resume);
console.log('Pages updated');
