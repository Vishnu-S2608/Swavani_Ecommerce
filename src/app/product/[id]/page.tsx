import { notFound } from "next/navigation";
import { products } from "@/lib/data";
import { ProductDetailClient } from "./ProductDetailClient";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = products.find(
    (p) =>
      p.id === id ||
      p.id.toLowerCase() === id.toLowerCase() ||
      p.id.replace(/^p/i, "") === id.replace(/^p/i, "")
  );

  if (!product) {
    return {
      title: "Product Not Found — House of Swavani",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://swavanistore.com";

  return {
    title: `${product.name} — House of Swavani`,
    description: product.description || product.subtitle,
    openGraph: {
      title: `${product.name} | House of Swavani`,
      description: product.subtitle,
      url: `${siteUrl}/product/${product.id}`,
      siteName: "House of Swavani",
      images: [
        {
          url: product.image,
          width: 800,
          height: 1200,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.subtitle,
      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find(
    (p) =>
      p.id === id ||
      p.id.toLowerCase() === id.toLowerCase() ||
      p.id.replace(/^p/i, "") === id.replace(/^p/i, "")
  );

  if (!product) {
    notFound();
  }

  const related = products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category || p.occasion === product.occasion)
    )
    .slice(0, 4);

  return <ProductDetailClient product={product} related={related} />;
}
