import { Workspace } from '@/components/workspace/workspace';
import { IdentityHub } from '@/components/workspace/identity-hub';
import { IconGrid } from '@/components/icons/icon-grid';
import { ClusterWatermarks } from '@/components/icons/cluster-watermark';
import { Dock } from '@/components/dock/dock';
import { BootSequence } from '@/components/boot/boot-sequence';
import { OsChrome } from '@/components/workspace/os-chrome';

export default function Home() {
  return (
    <Workspace>
      <BootSequence />
      <OsChrome />
      <div className="hidden xl:block">
        <ClusterWatermarks />
      </div>
      <IdentityHub />
      <IconGrid />
      <Dock />
    </Workspace>
  );
}
