import React, { useState, useEffect } from "react";
import { Tr, Th, Td, TableContainer, Table, Thead, Tbody } from "@chakra-ui/react"

const Home = () => {
    const [data, setData] = useState([]);
    // console.log(data);

    const [items, setItems] = useState(0);



    useEffect(() => {

        const getData = async () => {
            try {
                const response = await fetch(
                    `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${items}`
                );
                const jsonData = await response.json();
                setData(prevData => [...prevData, ...jsonData.hits]);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
        const interval = setInterval(() => {

            setItems(items => items + 1)
        }, 10000)

        return () => {
            clearInterval(interval)
        }
    }, [items]);

    return (
        <>
            <div className="Container">

                <div className="body_container">

                    <TableContainer >
                        <Table size='sm' width={80} padding={20} ml={10} mt={5} boxShadow='outline' p='6' rounded='md' bg='white'>
                            <Thead>
                                <Tr>
                                    <Th>Title</Th>
                                    <Th>Author</Th>
                                    <Th>Url</Th>
                                </Tr>
                            </Thead>
                            {
                                data.map((items) => {

                                    return <Tbody>
                                        <Tr>
                                            <Td>{items.title
                                            }</Td>
                                            <Td >{items.author
                                            }</Td>
                                            <Td>{items.url
                                            }</Td>

                                        </Tr>


                                    </Tbody>

                                })
                            }


                        </Table>
                    </TableContainer>


                </div>


            </div>



        </>
    );
};

export default Home;


















