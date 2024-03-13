import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "../states/Loading";

import CardForm from "./CardForm";
import UpiForm from "./UpiForm";

interface Props {}

const TabbedList = (props: Props) => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-4 justify-between items-start w-full pt-4">
            {loading ? (
                <Loading />
            ) : (
                <Tabs defaultValue="UPI" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="UPI">UPI</TabsTrigger>
                        <TabsTrigger value="CARDS">CARDS</TabsTrigger>
                    </TabsList>
                    <TabsContent value="UPI">
                        <Card className="flex items-center justify-center">
                            <CardContent className="space-y-2 flex flex-col w-full items-center gap-5 justify-between mt-4">
                                <UpiForm setLoading={setLoading} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="CARDS">
                        <Card>
                            <CardContent className="space-y-2 mt-4">
                                <CardForm setLoading={setLoading} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            )}
        </div>
    );
};

export default TabbedList;
