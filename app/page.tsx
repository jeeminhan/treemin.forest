import { Workspace } from '@/components/workspace/workspace';
import { IdentityHub } from '@/components/workspace/identity-hub';
import { Dock } from '@/components/dock/dock';

export default function Home() {
  return (
    <Workspace>
      <IdentityHub />
      <Dock />
    </Workspace>
  );
}
