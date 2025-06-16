export const metadata = {
  title: 'Coin Toss - Decision It',
  description: 'Flip a coin to decide between options with the Decision It coin flipper!',
  keywords: 'coin toss, decision maker, random choice, coin flip, decision tool',
}

import CoinToss from '@/app/components/cointoss';

export default function CoinTossPage() {
  return <CoinToss />;
}