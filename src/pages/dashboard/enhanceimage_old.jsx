import {
  Card,
  CardBody,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";

export default function EnhanceImage() {
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <div>

          </div>
        </CardBody>
      </Card>
    </div>
  );
}
