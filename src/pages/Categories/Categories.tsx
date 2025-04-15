import {
  Card,
  CardContent,
  Button,
  TextField,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";

const Categories = () => {
  interface Category {
    name: string;
    type: string;
    status: string;
    description: string;
  }

  const [category, setCategory] = useState<Category>({
    name: "",
    type: "",
    status: "Active",
    description: "",
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : [];
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const handleChange = (field: keyof Category, value: string) => {
    setCategory((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!category.name || !category.type || !category.description) {
      alert("All fields are required!");
      return;
    }

    const exists = categories.some(
      (cat, i) =>
        cat.name.toLowerCase() === category.name.toLowerCase() &&
        i !== editingIndex
    );

    if (exists) {
      alert("Category already exists!");
      return;
    }

    if (editingIndex !== null) {
      const updated = [...categories];
      updated[editingIndex] = category;
      setCategories(updated);
      setEditingIndex(null);
    } else {
      setCategories((prev) => [...prev, category]);
    }

    setCategory({ name: "", type: "", status: "Active", description: "" });
    setOpenModal(false);
  };

  const handleEdit = (index: number) => {
    setCategory(categories[index]);
    setEditingIndex(index);
    setOpenModal(true);
  };

  const handleDelete = (index: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter((_, i) => i !== index));
    }
  };

  const toggleStatus = (index: number) => {
    setCategories((prev) =>
      prev.map((cat, i) =>
        i === index
          ? { ...cat, status: cat.status === "Active" ? "Inactive" : "Active" }
          : cat
      )
    );
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredCategories = categories.filter(
    (cat) =>
      (filterType ? cat.type === filterType : true) &&
      (filterStatus ? cat.status === filterStatus : true)
  );

  return (
    <div className="font-poppins w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-green-600 p-6">
      <Card className="w-full shadow-lg rounded-2xl p-6 border border-gray-300 bg-white">
        <CardContent>
          <div className="flex justify-between items-center mb-6 font-bold">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenModal(true)}
            >
              Add Category
            </Button>
          </div>

          {categories.length > 0 ? (
            <div className="overflow-x-auto font-poppins ">
              <TableContainer component={Paper} className="rounded-xl">
                <Table>
                  <TableHead>
                    <TableRow className="bg-gray-100">
                      <TableCell align="center" className="font-semibold font-poppins">
                        SR.No.
                      </TableCell>
                      <TableCell align="center" className="font-semibold font-poppins">
                        Category Name
                      </TableCell>
                      <TableCell align="center" className="font-semibold font-poppins">
                        Type
                      </TableCell>
                      <TableCell align="center" className="font-semibold font-poppins">
                        Status
                      </TableCell>
                      <TableCell align="center" className="font-semibold font-poppins">
                        Description
                      </TableCell>
                      <TableCell align="center" className="font-semibold font-poppins">
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCategories
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((cat, index) => (
                        <TableRow
                          key={index}
                          className={`${
                            cat.status === "Active" ? "" : "bg-red-50"
                          } hover:bg-gray-100 transition`}
                        >
                          <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                          <TableCell align="center">{cat.name}</TableCell>
                          <TableCell align="center">{cat.type}</TableCell>
                          <TableCell align="center">
                            <Button onClick={() => toggleStatus(index)} size="small">
                              {cat.status}
                            </Button>
                          </TableCell>
                          <TableCell align="center">{cat.description}</TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Button onClick={() => handleEdit(index)} size="small" variant="outlined">
                                ✏️
                              </Button>
                              <Button onClick={() => handleDelete(index)} size="small" variant="outlined" color="error">
                                🗑️
                              </Button>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                <TablePagination
                  count={filteredCategories.length}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </div>
          ) : (
            <p className="text-gray-600 text-center mt-6 font-poppins">
              No categories added yet.
            </p>
          )}
        </CardContent>
      </Card>

      <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="sm">
        <DialogTitle className="font-poppins">
          {editingIndex !== null ? "Edit Category" : "Add Category"}
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-4 mt-2">
            <TextField
              label="Category Name"
              value={category.name}
              onChange={(e) => handleChange("name", e.target.value)}
              fullWidth
            />
            <Select
              value={category.type}
              onChange={(e) => handleChange("type", e.target.value)}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">Select Type</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
            <TextField
              label="Description"
              multiline
              rows={4}
              value={category.description}
              onChange={(e) => handleChange("description", e.target.value)}
              fullWidth
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingIndex !== null ? "Update" : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Categories;
