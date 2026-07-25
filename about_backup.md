# Backup: About Summary (Home B2B)

Esse bloco de código costumava exibir o "Quem sou eu / O que eu já fiz" na home principal, mas foi removido do `page.tsx` para deixar o código mais limpo, conforme solicitado.

```tsx
<section className="container mx-auto px-fluid-m py-fluid-3xl border-t border-border/50">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-fluid-xl">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-150px" }}
        >
            <h2 className="text-step-3 font-heading font-semibold mb-fluid-s">{content.aboutSummary.heading1}</h2>
            <p className="text-step-0 text-foreground font-light leading-relaxed">
                {content.aboutSummary.paragraph1}
            </p>
        </motion.div>
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-150px" }}
            transition={{ delay: 0.2 }}
        >
            <h2 className="text-step-3 font-heading font-semibold mb-fluid-s">{content.aboutSummary.heading2}</h2>
            <p className="text-step-0 text-foreground font-light leading-relaxed">
                {content.aboutSummary.paragraph2}
            </p>
        </motion.div>
    </div>
</section>
```
