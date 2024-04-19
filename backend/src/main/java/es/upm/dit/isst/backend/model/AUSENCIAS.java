package es.upm.dit.isst.backend.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.time.*;

@Entity
public class AUSENCIAS {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;

    private LocalDate fechaInicio; 
    private LocalDate fechaFin;
    private boolean esAusencia;
    private boolean esVacaciones;
    private boolean esBaja;  
    private String motivo;
    private String estado; //pendiente, aceptada, rechazada


    @ManyToOne
    @JoinColumn(name = "empleado_id")
    @JsonBackReference
    private EMPLEADO empleado;


    // Constructor vacío
    public AUSENCIAS() {
    }

    public AUSENCIAS(LocalDate fechaInicio, LocalDate fechaFin, boolean esAusencia, boolean esVacaciones, boolean esBaja, String motivo, String estado, EMPLEADO empleado) {
        
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.esAusencia = esAusencia;
        this.esVacaciones = esVacaciones;
        this.esBaja = esBaja;
        this.motivo = motivo;
        this.estado = estado;
        this.empleado = empleado;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaInicio() {
        return this.fechaInicio;
    }

    public void setFechaInicio(LocalDate fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public LocalDate getFechaFin() {
        return this.fechaFin;
    }

    public void setFechaFin(LocalDate fechaFin) {
        this.fechaFin = fechaFin;
    }

    public boolean getEsAusencia() {
        return this.esAusencia;
    }

    public void setEsAusencia(boolean esAusencia) {
        this.esAusencia = esAusencia;
    }

    public boolean getEsVacaciones() {
        return this.esVacaciones;
    }


    public void setEsVacaciones(boolean esVacaciones) {
        this.esVacaciones = esVacaciones;
    }


    public boolean getEsBaja() {
        return this.esBaja;
    }


    public void setEsBaja(boolean esBaja) {
        this.esBaja = esBaja;
    }


    public String getMotivo() {
        return this.motivo;
    }


    public void setMotivo(String motivo) {
        this.motivo = motivo;
    }


    public String getEstado() {
        return this.estado;
    }


    public void setEstado(String estado) {
        this.estado = estado;
    }


    public EMPLEADO getEmpleado() {
        return this.empleado;
    }


    public void setEmpleado(EMPLEADO empleado) {
        this.empleado = empleado;
    }


}
