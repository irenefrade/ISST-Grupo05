package es.upm.dit.isst.backend.model;

import jakarta.persistence.*;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class EMPRESACLIENTE {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombreEmpresa;
    private Boolean estaSuscrito;
    private String password;
    @OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<EMPLEADO> empleados;

    // Constructor vacío
    public EMPRESACLIENTE() {
    }

    // Constructor con todos los campos 
    public EMPRESACLIENTE(Long id, String nombreEmpresa, Boolean estaSuscrito, String password) {
        this.id = id;
        this.nombreEmpresa = nombreEmpresa;
        this.estaSuscrito = estaSuscrito;
        this.password = password;
    }

    // Getters y setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreEmpresa() {
        return nombreEmpresa;
    }

    public void setNombreEmpresa(String nombreEmpresa) {
        this.nombreEmpresa = nombreEmpresa;
    }

    public Boolean getEstaSuscrito() {
        return estaSuscrito;
    }

    public void setEstaSuscrito(Boolean estaSuscrito) {
        this.estaSuscrito = estaSuscrito;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<EMPLEADO> getEmpleados() {
        return empleados;
    }

    public void setEmpleados(List<EMPLEADO> empleados) {
        this.empleados = empleados;
    }
}