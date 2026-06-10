---
layout: ../../layouts/Layout.astro
title: Math rendering test
description: Verifying KaTeX build-time rendering.
---

# Math rendering test

Inline math: $E = mc^2$

Block math:

$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

The Black-Scholes formula:

$$
C = S_0 N(d_1) - K e^{-rT} N(d_2)
$$

where:

$$
d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}, \quad d_2 = d_1 - \sigma\sqrt{T}
$$
