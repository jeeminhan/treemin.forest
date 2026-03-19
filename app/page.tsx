import { Workspace } from '@/components/workspace/workspace';
import { IdentityHub } from '@/components/workspace/identity-hub';
import { IconGrid } from '@/components/icons/icon-grid';
import { Dock } from '@/components/dock/dock';

export default function Home() {
  return (
    <Workspace>
      <IdentityHub />
      <IconGrid />
      <Dock />
    </Workspace>
  );
}
