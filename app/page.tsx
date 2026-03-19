import { Workspace } from '@/components/workspace/workspace';
import { IdentityHub } from '@/components/workspace/identity-hub';
import { IconGrid } from '@/components/icons/icon-grid';
import { Dock } from '@/components/dock/dock';
import { BootSequence } from '@/components/boot/boot-sequence';

export default function Home() {
  return (
    <Workspace>
      <BootSequence />
      <IdentityHub />
      <IconGrid />
      <Dock />
    </Workspace>
  );
}
