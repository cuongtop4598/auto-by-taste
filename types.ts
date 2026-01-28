
export interface ProductTier {
  name: string;
  hardware: string;
  target: string;
  capability: string;
  priceEstimate?: string;
}

export interface FundingAllocation {
  name: string;
  value: number;
  color: string;
}

export interface NavItem {
  label: string;
  href: string;
}
