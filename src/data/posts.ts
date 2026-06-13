export interface Post {
  title: string;
  href: string;
  date: string;
  description: string;
  tags: string[];
}

export const posts: Post[] = [
  {
    title: "Foreign exchange liberalisation in Morocco",
    href: "/blog/foreign-exchange-liberalisation-in-morocco",
    date: "Mar 4, 2026",
    description:
      "What a floating dirham would mean for spreads, hedging, and the microstructure of an emerging FX market — and why the transition path matters more than the endpoint.",
    tags: ["Market making", "Fintech"],
  },
  {
    title: "Fostering an experimentation culture within Product teams",
    href: "/blog/fostering-an-experimentation-culture-within-product-teams",
    date: "Feb 18, 2026",
    description:
      "Why most A/B programs stall, and a practical playbook for causal rigor — from guardrail metrics to the organisational habits that make experiments stick.",
    tags: ["Causal inference", "Product"],
  },
];
