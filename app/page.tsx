import { Workspace } from '@/components/workspace/workspace';
import { IdentityHub } from '@/components/workspace/identity-hub';
import { IconGrid } from '@/components/icons/icon-grid';
import { ClusterWatermarks } from '@/components/icons/cluster-watermark';
import { Dock } from '@/components/dock/dock';
import { BootSequence } from '@/components/boot/boot-sequence';
import { OsChrome } from '@/components/workspace/os-chrome';
import { Terminal } from '@/components/terminal/terminal';
import { EasterEggs } from '@/components/workspace/easter-eggs';
import { HiddenFile } from '@/components/workspace/hidden-file';

export default function Home() {
  return (
    <Workspace>
      <BootSequence />
      <OsChrome />
      <EasterEggs />
      <HiddenFile />
      <div className="hidden xl:block">
        <ClusterWatermarks />
      </div>
      <IdentityHub />
      <IconGrid />
      <Dock />
      <Terminal />
    </Workspace>
  );
}
