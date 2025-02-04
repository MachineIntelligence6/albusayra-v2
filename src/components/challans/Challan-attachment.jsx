import { FileText, Image, FileIcon, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  challanAttachments,
  ChallanAttachment,
} from "./challan-attachments-data";

const getIcon = (type) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-5 w-5 text-red-500" />;
    case "image":
      return <Image alt="" className="h-5 w-5 text-blue-500" />;
    default:
      return <FileIcon className="h-5 w-5 text-green-500" />;
  }
};

export default function ChallanAttachments() {
  return (
    <div className="w-full max-w-md p-4">
      <h2 className="text-lg font-semibold mb-4">CHALLAN ATTACHMENTS</h2>
      <div className="space-y-3">
        {challanAttachments?.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center justify-between p-3 bg-white rounded-lg border"
          >
            <div className="flex items-center gap-2">
              {getIcon(attachment.type)}
              <div>
                <span className="font-medium">{attachment.name}</span>
                <p className="text-sm text-gray-500">
                  {attachment.size} • {attachment.uploadDate}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Download className="h-4 w-4" />
              <span className="sr-only">Download {attachment.name}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
