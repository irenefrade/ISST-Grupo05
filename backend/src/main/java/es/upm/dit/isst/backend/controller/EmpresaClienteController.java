
package es.upm.dit.isst.backend.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import es.upm.dit.isst.backend.repository.EmpresaClienteRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

import es.upm.dit.isst.backend.model.*;
import es.upm.dit.isst.backend.repository.*;

@RestController
public class EmpresaClienteController {
    
    @Autowired
    private final EmpresaClienteRepository empresaClienteRepository;

    public EmpresaClienteController(EmpresaClienteRepository n)  {
        this.empresaClienteRepository = n;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/empresas")
    List<EMPRESACLIENTE> readAll(){
        return (List<EMPRESACLIENTE>) empresaClienteRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/empresas")
    ResponseEntity<EMPRESACLIENTE> create(@RequestBody EMPRESACLIENTE newEmpresa) throws URISyntaxException{
        EMPRESACLIENTE res = empresaClienteRepository.save(newEmpresa);
        return ResponseEntity.created(new URI("/empresas/" + res.getId())).body(res);
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/empresas/{id}")
    ResponseEntity<EMPRESACLIENTE> update(@RequestBody EMPRESACLIENTE newEmpresa, @PathVariable long id) {
        // Aquí el map falla ns por qué, puede que un fallo de static import
        return empresaClienteRepository.findById(id).map(empresa -> {
            empresa.setNombreEmpresa(newEmpresa.getNombreEmpresa());
            empresa.setPassword(newEmpresa.getPassword());
            empresa.setEstaSuscrito(newEmpresa.getEstaSuscrito());
            empresaClienteRepository.save(empresa);
            return ResponseEntity.ok().body(empresa);            
        }).orElse(new ResponseEntity<EMPRESACLIENTE>(HttpStatus.NOT_FOUND));
    }
    
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/empresas/{id}")
    ResponseEntity<?> delete(@PathVariable Long id) {
    return empresaClienteRepository.findById(id).map(empresa -> {
        empresaClienteRepository.delete(empresa);
        return ResponseEntity.ok().build();
    }).orElse(ResponseEntity.notFound().build());
}

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/empresas/{empresaId}/empleados")
    public List<EMPLEADO> obtenerHorariosDeEmpleado(@PathVariable Long empresaId) {
        EMPRESACLIENTE empresa = empresaClienteRepository.findById(empresaId).get();
        return empresa.getEmpleados();
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/empresas/{empresaId}/empleados")
    public ResponseEntity<EMPLEADO> create(@RequestBody EMPLEADO newEmpleados, @PathVariable Long empresaId) {
        EMPRESACLIENTE empresa = empresaClienteRepository.findById(empresaId).get();
    
        // Agregar el nuevo horario al empleado
        newEmpleados.setEmpresa(empresa);
        empresa.getEmpleados().add(newEmpleados);
    
        // Guardar el empleado actualizado en la base de datos
        empresaClienteRepository.save(empresa);
    
        return ResponseEntity.ok(newEmpleados);
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/empresas/{empresaId}/editarEmpresa")
    public List<EMPLEADO> obtenerDatosDeEmpleado(@PathVariable Long empresaId) {
        EMPRESACLIENTE empresa = empresaClienteRepository.findById(empresaId).get();
        return empresa.getEmpleados();
    }
}