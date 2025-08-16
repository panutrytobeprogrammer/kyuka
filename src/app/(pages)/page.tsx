"use client";
import AddDataModal from "@components/AddDataModal";
import DataTable from "@components/DataTable";
import Header from "@components/Header";
import { AddIcon } from "@components/Icons";
import ListAll from "@components/ListAll";
import ListTab from "@components/ListTab";
import NavBar from "@components/NavBar";
import ResultTab from "@components/ResultTab";
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
import { useRef, useState } from "react";

export default function Home() {
  const addData = useDisclosure();
  const params = useSearchParams();
  const id = params.get("id") as string;
  const inputRef = useRef<HTMLInputElement>(null);

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
      <Header
        title={getTrip.data?.data.data.name}
        refetch={getDataTable.refetch}
      />
      <Tabs
        radius="full"
        selectedKey={selectedTab}
        onSelectionChange={(key) => setSelectedTab(key as string)}
        className="w-full flex justify-center"
        classNames={{
          tabList: "bg-box",
          cursor: "bg-item",
        }}
      >
        {/* <Tab key="addData" title="data" /> */}
        {/* <Tab key="list" title="by list" /> */}
        <Tab key="listAll" title="list" />
        <Tab key="result" title="member" />
      </Tabs>
      {getDataTable.isSuccess ? (
        (() => {
          switch (selectedTab) {
            case "addData":
              return (
                <>
                  <div className="flex justify-end p-2 w-full"></div>
                  <div className="p-2 w-full">
                    <DataTable
                      tripData={getTrip.data?.data.data}
                      transactionData={getDataTable.data?.data.data}
                    />
                  </div>
                </>
              );
            case "list":
              return (
                <ListTab
                  tripId={id}
                  transactionData={getDataTable.data?.data.data}
                  refetch={getDataTable.refetch}
                />
              );
            case "result":
              return (
                <ResultTab
                  transactionData={getDataTable.data?.data.data}
                  members={getTrip.data?.data.data.member}
                />
              );
            case "listAll":
              return (
                <ListAll
                  tripId={id}
                  transactionData={getDataTable.data?.data.data}
                  refetch={getDataTable.refetch}
                />
              );
            default:
              return null;
          }
        })()
      ) : (
        <></>
      )}

      <Modal isOpen={addData.isOpen} onClose={addData.onClose} size="lg">
        <ModalContent>
          {(onClose) => {
            return (
              <AddDataModal
                inputRef={inputRef}
                onClose={onClose}
                tripData={getTrip.data?.data.data}
                getDataTable={getDataTable}
              />
            );
          }}
        </ModalContent>
      </Modal>
      <NavBar>
        <Button
          isIconOnly
          className="bg-item"
          onPress={() => {
            addData.onOpen();
          }}
        >
          <AddIcon />
        </Button>
      </NavBar>
    </div>
  ) : (
    <div className="flex flex-col h-screen w-full items-center justify-center overflow-y-auto">
      <Spinner variant="gradient" color="default" />
    </div>
  );
}
