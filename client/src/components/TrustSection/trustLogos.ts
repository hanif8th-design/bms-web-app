export interface TrustLogo {
  name: string
  src: string
}

const simpleIconsCdn =
  'https://cdn.jsdelivr.net/npm/simple-icons@v16/icons'

/** Temporary layout assets; replace these entries with verified customer logos. */
export const trustLogos: TrustLogo[] = [
  { name: 'Shopify', src: `${simpleIconsCdn}/shopify.svg` },
  { name: 'Slack', src: `${simpleIconsCdn}/slack.svg` },
  { name: 'Notion', src: `${simpleIconsCdn}/notion.svg` },
  { name: 'Stripe', src: `${simpleIconsCdn}/stripe.svg` },
  { name: 'Dropbox', src: `${simpleIconsCdn}/dropbox.svg` },
  { name: 'Canva', src: `${simpleIconsCdn}/canva.svg` },
]
