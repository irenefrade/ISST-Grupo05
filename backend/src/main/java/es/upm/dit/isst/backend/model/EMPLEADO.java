package es.upm.dit.isst.backend.model;


import java.util.List;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
public class EMPLEADO {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombreCompleto;
    private String numeroTelefono;
    private String correoElectronico;
    private String password;
    private String departamento;
    private String puesto;
    private Boolean esControlador;
    private Boolean esResponsable;
    private String nombreEmpresa;
    private Boolean suscripcionEmpresa;
    private String passwordEmpresa;
    private Long empresaId;
    
   
    @OneToMany(mappedBy = "empleado", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<HORARIOS> horarios;
    
    @OneToMany(mappedBy = "empleado", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<AUSENCIAS> ausencias;
    //@ManyToOne
    //@JoinColumn(name = "empresa_id")
    //@JsonBackReference
    //private EMPRESACLIENTE empresa;
   

    // Constructor vacío
    public EMPLEADO() {
    }

    // Constructor con todos los campos
    
    public EMPLEADO(String nombreCompleto, String numeroTelefono, String correoElectronico, String password, String departamento, String puesto, Boolean esControlador, Boolean esResponsable, String nombreEmpresa, Boolean suscripcionEmpresa, String passwordEmpresa, Long empresaId) {
        this.nombreCompleto = nombreCompleto;
        this.numeroTelefono = numeroTelefono;
        this.correoElectronico = correoElectronico;
        this.password = password;
        this.departamento = departamento;
        this.puesto = puesto;
        this.esControlador = esControlador;
        this.esResponsable = esResponsable;
        this.nombreEmpresa = nombreEmpresa;
        this.suscripcionEmpresa = suscripcionEmpresa;
        this.passwordEmpresa = passwordEmpresa;
        this.empresaId = empresaId;
    }

    public Boolean getEsResponsable() {
        return esResponsable;
    }

    public void setEsResponsable(Boolean esResponsable) {
        this.esResponsable = esResponsable;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombreCompleto() {
        return this.nombreCompleto;
    }


    public void setNombreCompleto(String nombreCompleto) {
        this.nombreCompleto = nombreCompleto;
    }

    public String getNumeroTelefono() {
        return this.numeroTelefono;
    }

    public void setNumeroTelefono(String numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
    }

    public String getCorreoElectronico() {
        return this.correoElectronico;
    }

    public void setCorreoElectronico(String correoElectronico) {
        this.correoElectronico = correoElectronico;
    }

    public String getDepartamento() {
        return this.departamento;
    }

    
    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDepartamento(String departamento) {
        this.departamento = departamento;
    }

    public String getPuesto() {
        return this.puesto;
    }

    public void setPuesto(String puesto) {
        this.puesto = puesto;
    }

    public Boolean getEsControlador(){
        return this.esControlador;
    }

    public void setEsControlador(Boolean esControlador){
        this.esControlador = esControlador; 
    }

    public List<HORARIOS> getHorarios() {
        return this.horarios;
    }

    public void setHorarios(List<HORARIOS> horarios) {
        this.horarios = horarios;
    }

    public List<AUSENCIAS> getAusencias() {
        return this.ausencias;
    }

    public void setAusencias(List<AUSENCIAS> ausencias) {
        this.ausencias = ausencias;
    }

    public String getNombreEmpresa() {
        return nombreEmpresa;
    }

    public void setNombreEmpresa(String nombreEmpresa) {
        this.nombreEmpresa = nombreEmpresa;
    }

    public Boolean getSuscripcionEmpresa() {
        return suscripcionEmpresa;
    }

    public void setSuscripcionEmpresa(Boolean suscripcionEmpresa) {
        this.suscripcionEmpresa = suscripcionEmpresa;
    }

    public String getPasswordEmpresa() {
        return passwordEmpresa;
    }

    public void setPasswordEmpresa(String passwordEmpresa) {
        this.passwordEmpresa = passwordEmpresa;
    }
    public Long getEmpresaId() {
        return empresaId;
    }

    public void setEmpresaId(Long empresaId) {
        this.empresaId = empresaId;
    }


   

}
