import {
  InfoCard,
  InfoItem,
} from "@/components/shared-components/CustomInfoCard";
import { MapIcon, PhoneIcon, UserCircleIcon } from "@/utils/Icons";

export function ReferralView({ profile, onEdit }) {
  return (
    <InfoCard title="REFERRAL" onEdit={onEdit}>
      <InfoItem
        label="Referred By"
        value={profile?.referralBy}
        icon={<UserCircleIcon />}
      />
      <InfoItem
        label="Referral Phone"
        value={profile?.referralContactNumber}
        icon={<PhoneIcon />}
      />
      <InfoItem
        label="Referral Address"
        value={profile?.referralAddress}
        icon={<MapIcon />}
      />
    </InfoCard>
  );
}
