import Swal from "sweetalert2";

export const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger m-2",
    cancelButton: "btn btn-outline-dark",
  },
  buttonsStyling: false,
});
