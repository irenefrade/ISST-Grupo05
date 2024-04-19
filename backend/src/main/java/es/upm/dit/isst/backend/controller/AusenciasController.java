package es.upm.dit.isst.backend.controller;

import es.upm.dit.isst.backend.model.*;
import es.upm.dit.isst.backend.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import java.net.URI;
import java.net.URISyntaxException;
import org.springframework.web.bind.annotation.DeleteMapping;
import java.util.Optional;



@RestController
public class AusenciasController {

    @Autowired
    private final  AusenciasRepository ausenciasRepository;


    public AusenciasController(AusenciasRepository n)  {
        this.ausenciasRepository = n;
    }

    @CrossOrigin(origins = "http://localhost:3000")

    @GetMapping("/ausencias")
    List<AUSENCIAS> readAll(){
        return (List<AUSENCIAS>) ausenciasRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/ausencias")
    ResponseEntity<AUSENCIAS> create(@RequestBody AUSENCIAS newAusencia) throws URISyntaxException {
        AUSENCIAS res = ausenciasRepository.save(newAusencia);
        return ResponseEntity.created(new URI("/ausencias/" + res.getId())).body(res);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/ausencias/{id}")
    ResponseEntity<AUSENCIAS> read(@PathVariable long id) {
        Optional<AUSENCIAS> ausencia = ausenciasRepository.findById(id);
        return ausencia.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/ausencias/{id}")
    ResponseEntity<AUSENCIAS> update(@RequestBody AUSENCIAS newAusencia, @PathVariable long id) {
        return ausenciasRepository.findById(id).map(ausencia -> {
            ausencia.setFechaInicio(newAusencia.getFechaInicio());
            ausencia.setFechaFin(newAusencia.getFechaFin());
            ausencia.setEsAusencia(newAusencia.getEsAusencia());
            ausencia.setEsVacaciones(newAusencia.getEsVacaciones());
            ausencia.setEsBaja(newAusencia.getEsBaja());
            ausencia.setMotivo(newAusencia.getMotivo());
            ausencia.setEstado(newAusencia.getEstado());
            ausencia.setEmpleado(newAusencia.getEmpleado());
            return ResponseEntity.ok(ausenciasRepository.save(ausencia));
        }).orElseGet(() -> {
            newAusencia.setId(id);
            return ResponseEntity.ok(ausenciasRepository.save(newAusencia));
        });
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/ausencias/{id}")
    ResponseEntity<?> delete(@PathVariable Long id) {
        return ausenciasRepository.findById(id).map(ausencia -> {
            ausenciasRepository.delete(ausencia);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
