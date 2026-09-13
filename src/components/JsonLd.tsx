export type JsonLdProps = {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
};

/** يضيف بيانات structured data إلى الصفحة */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // البيانات ثابتة داخل المستودع ولا تأتي من مدخلات المستخدم
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default JsonLd;
