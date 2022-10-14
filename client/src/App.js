import "./App.css";
import React, { Component } from "react";
import { Route } from "react-router-dom";
import Product from "./components/DetailProducts/DetailProducts";
import Ecommerce from './components/Ecommerce/Ecommerce';
// import { createProducts, getProducts } from "./store/actions";
// import ShoppingCart from "./components/Shopping/ShoppingCart";

function App() {
  return (
    <div className="App">

      <Route exact path={'/'} component={Ecommerce}></Route>
      <Route patch={'/products/:id'} component={Product}></Route>

    </div>

  );
}

export default App;














{/* 
   const dispatch = useDispatch();
  const { products, loading } = useSelector((store) => store);
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => { */}
{/* //   dispatch(getProducts());
  // }, [dispatch]);
  // return (
  //   <ChakraProvider theme={theme}>
  //     <Box textAlign="center">
  //       <Grid */}
{/* //         minH="100vh"
  //         templateRows="auto 1fr"
  //         templateColumns="auto 1fr"
  //         p={"1rem 1.5rem"}
  //       >
  //         <HeaderComponent />
  //         <Table gridColumn="1 / span 2">
  //           <Thead>
  //             <Tr>
  //               <Th>Nombre:</Th>
  //               <Th>Descripción:</Th>
  //               <Th>Precio:</Th>
  //               <Th>Stock:</Th>
  //               <Th textAlign="right">
  //                 <ButtonGroup isAttached>
  //                   <IconButton */}
{/* //                     aria-label="agregar"
  //                     icon={<IoAdd />}
  //                     variant="ghost"
  //                     onClick={() => {
  //                       onOpen();
  //                     }}
  //                   />
  //                 </ButtonGroup>
  //               </Th>
  //             </Tr>
  //           </Thead>
  //           <Tbody>
  //             {products?.map((product) => (
  //               <Tr key={product.id}>
  //                 <Td>{product.name}</Td>
  //                 <Td>{product.description}</Td>
  //                 <Td>{product.price}</Td>
  //                 <Td>{product.stock}</Td>
  //                 <Td textAlign="right">
  //                   <ButtonGroup isAttached>
  //                     <IconButton
  //                       aria-label="update"
  //                       icon={<IoPencil />}
  //                       variant="ghost"
  //                     />
  //                     <IconButton
  //                       aria-label="delete"
  //                       icon={<IoTrash />}
  //                       variant="ghost"
  //                     />
  //                   </ButtonGroup>
  //                 </Td>
  //               </Tr>
  //             ))}
  //           </Tbody>
  //         </Table>
  //       </Grid>
  //     </Box>
  //     <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
  //       <ModalOverlay />
  //       <Formik
  //         initialValues={{ name: "", description: "", price: 0, stock: 0 }}
  //         onSubmit={async (values) => {
  //           dispatch(createProducts(values));
  //           onClose();
  //         }}
  //       >
  //         {({ submitForm, values, handleChange }) => (
  //           <ModalContent>
  //             <ModalHeader>Sugerencias</ModalHeader>
  //             <ModalBody>
  //               <Form>
  //                 <FormControl id="name">
  //                   <FormLabel>Nombre</FormLabel>
  //                   <Input
  //                     type="name"
  //                     value={values.name}
  //                     onChange={handleChange}
  //                   />
  //                 </FormControl>
  //                 <FormControl id="description">
  //                   <FormLabel>Descripción</FormLabel>
  //                   <Textarea
  //                     type="body"
  //                     value={values.description}
  //                     onChange={handleChange}
  //                   />
  //                 </FormControl>
  //                 <FormControl id="price">
  //                   <FormLabel>Precio</FormLabel>
  //                   <Input
  //                     type="price"
  //                     value={values.price}
  //                     onChange={handleChange}
  //                   />
  //                 </FormControl>
  //                 <FormControl id="stock">
  //                   <FormLabel>Stock</FormLabel>
  //                   <Input
  //                     type="stock"
  //                     value={values.stock}
  //                     onChange={handleChange}
  //                   />
  //                 </FormControl>
  //               </Form>
  //             </ModalBody>
  //             <ModalFooter>
  //               <Button
  //                 variant="ghost"
  //                 mr={3}
  //                 onClick={onClose}
  //                 isLoading={loading}
  //               >
  //                 Cancelar
  //               </Button>
  //               <Button
  //                 colorScheme="yellow"
  //                 rightIcon={<IoSend style={{ marginTop: "0.125rem" }} />}
  //                 onClick={submitForm}
  //                 isLoading={loading}
  //               >
  //                 Enviar
  //               </Button>
  //             </ModalFooter>
  //           </ModalContent>
  //         )}
  //       </Formik>
  //     </Modal>
  //   </ChakraProvider>
  // ); */}