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
  Tab,
  Tabs,
  useDisclosure,
} from "@heroui/react";
import { getTransactionData, getTripData } from "@libs/service";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const addData = useDisclosure();
  const params = useSearchParams();
  const id = params.get("id") as string;

  const [selectedTab, setSelectedTab] = useState("addData");

  const getDataTable = useQuery({
    queryKey: ["get-data-table"],
    queryFn: async () => {
      return await getTransactionData(id);
    },
  });

  const getTrip = useQuery({
    queryKey: ["get-trip"],
    queryFn: async () => {
      return await getTripData(id);
    },
    refetchInterval: false,
  });

  return getTrip.isSuccess ? (
    <div className="flex flex-col h-screen w-full overflow-y-auto items-center">
      <Header title={getTrip.data?.data.data.name} />
      {(() => {
        switch (selectedTab) {
          case "addData":
            return getDataTable.isSuccess ? (
              <>
                <div className="flex justify-end p-2 w-full">
                  <Button
                    isIconOnly
                    className="bg-item"
                    onPress={addData.onOpen}
                  >
                    <AddIcon />
                  </Button>
                </div>
                <div className="p-2 w-full">
                  <DataTable
                    tripData={getTrip.data?.data.data}
                    transactionData={getDataTable.data?.data.data}
                  />
                </div>
              </>
            ) : (
              <></>
            );
          case "list":
            return <></>;
          case "result":
            return <></>;
          default:
            return null;
        }
      })()}
      <Tabs
        radius="full"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
        className="fixed bottom-10 w-full flex justify-center"
        classNames={{
          tabList: "bg-box",
          cursor: "bg-item",
        }}
      >
        <Tab key="addData" title="add data" />
        <Tab key="list" title="List" />
        <Tab key="result" title="Result" />
      </Tabs>
      <Modal isOpen={addData.isOpen} onClose={addData.onClose} size="lg">
        <ModalContent>
          {(onClose) => {
            return (
              <AddDataModal
                onClose={onClose}
                tripData={getTrip.data?.data.data}
                getDataTable={getDataTable}
              />
            );
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
