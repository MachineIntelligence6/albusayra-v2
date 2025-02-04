import {
  InfoCard,
  InfoItem,
} from "@/components/shared-components/CustomInfoCard";
import {
  CheckIcon,
  MailIcon,
  PhoneIcon,
  WhatsappIcon,
  HomeIcon,
} from "@/utils/Icons";

export function ContactInfoView({ profile, onEdit, isUaeResident }) {
  return (
    <InfoCard title="CONTACT & RESIDENCE" onEdit={onEdit}>
      <InfoItem
        label="Email Address"
        value={profile?.email}
        icon={<MailIcon />}
      />
      <InfoItem
        label="Phone Number"
        value={profile?.contactNumber}
        icon={<PhoneIcon />}
      />
      <InfoItem
        label="WhatsApp Number"
        value={profile?.whatsAppNo}
        icon={<WhatsappIcon />}
      />
      {!isUaeResident && (
        <>
          <InfoItem
            label="Nationality"
            value={profile?.nationality}
            icon={<CheckIcon />}
          />
          <InfoItem
            label="Current Residency"
            value={profile?.currentCountry?.countryName}
            icon={<HomeIcon />}
          />
        </>
      )}
    </InfoCard>
  );
}
