export const metadata = {
  title: 'Plinko - Decision It',
  description: 'Play plinko to decide what to do! Whichever bucket the ball falls into wins!',
  keywords: 'plinko, decision maker, random choice, plinko decider, decision tool',
}

import Plinko from '@/app/components/plinko';

export default function PlinkoPage() {
  console.log("plinkoPage rendering");
  return <Plinko />;
}