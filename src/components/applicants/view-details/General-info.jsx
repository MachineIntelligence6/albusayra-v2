import {
  InfoCard,
  InfoItem,
} from "@/components/shared-components/CustomInfoCard";
import { FlagIcon, GenderIcon, HomeIcon, UserIcon } from "@/utils/Icons";

export function GeneralInfoView({ profile, onEdit }) {
  return (
    <InfoCard title="GENERAL INFORMATION" onEdit={onEdit}>
      <InfoItem
        label="Full Name"
        value={profile?.fullName}
        icon={<UserIcon />}
      />
      <InfoItem
        label="Gender"
        value={profile?.gender?.genderName}
        icon={<GenderIcon />}
      />
      <InfoItem
        label="Campaign Name"
        value={profile?.campaign?.campaignName}
        icon={<FlagIcon />}
      />
      <InfoItem
        label="UAE / Non UAE Resident"
        value={profile?.residentialStatus}
        icon={<HomeIcon />}
      />
    </InfoCard>
  );
}
