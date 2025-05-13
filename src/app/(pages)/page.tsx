"use client";
import AddDataModal from "@components/AddDataModal";
import DataTable from "@components/DataTable";
import Header from "@components/Header";
import { AddIcon } from "@components/Icons";
import {
  Button,
  Modal,
  ModalContent,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import { getTransactionData } from "@libs/service";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Home() {
  const addData = useDisclosure();
  const params = useParams();
  const id = params.id as string;

  const getDataTable = useQuery({
    queryKey: ["get-data-table"],
    queryFn: async () => {
      return await getTransactionData(id);
    },
  });
  return getDataTable.isSuccess ? (
    <div className="flex flex-col h-screen w-full overflow-y-auto">
      <Header title="Krabi" />
      <div className="flex justify-end p-2">
        <Button isIconOnly className="bg-item" onPress={addData.onOpen}>
          <AddIcon />
        </Button>
      </div>
      <div className="p-2">
        <DataTable />
      </div>
      <Modal isOpen={addData.isOpen} onClose={addData.onClose} size="lg">
        <ModalContent>
          {(onClose) => {
            return <AddDataModal onClose={onClose} />;
          }}
        </ModalContent>
      </Modal>
    </div>
  ) : (
    <div className="flex flex-col h-screen w-full items-center justify-center overflow-y-auto">
      <Spinner variant="gradient" color="default" />
    </div>
  );
}
