package es.upm.dit.isst.backend.controller;


import java.net.URI;
import java.net.URISyntaxException;
import java.time.Duration;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import es.upm.dit.isst.backend.model.*;
import es.upm.dit.isst.backend.repository.*;

@RestController
public class HorariosController {

    @Autowired
    private final  HorariosRepository horariosRepository;

    public HorariosController(HorariosRepository n)  {
        this.horariosRepository = n;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/horarios")
    List<HORARIOS> readAll(){
        return (List<HORARIOS>) horariosRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/horarios")
    ResponseEntity<HORARIOS> create(@RequestBody HORARIOS newHorarios) throws URISyntaxException {
        HORARIOS res = horariosRepository.save(newHorarios);
        return ResponseEntity.created(new URI("/horarios/" + res.getId())).body(res);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/horarios/{id}")
    ResponseEntity<HORARIOS> read(@PathVariable long id) {
        Optional<HORARIOS> horario = horariosRepository.findById(id);
        return horario.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // @CrossOrigin(origins = "http://localhost:3000")
    // @PutMapping("/horarios/{id}")
    // ResponseEntity<HORARIOS> update(@RequestBody HORARIOS newHorarios, @PathVariable long id) {
    //     return horariosRepository.findById(id).map(horario -> {
    //         horariosRepository.save(horario);
    //         return ResponseEntity.ok().body(horario);            
    //     }).orElse(new ResponseEntity<HORARIOS>(HttpStatus.NOT_FOUND));
    // }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/horarios/{id}")
    ResponseEntity<HORARIOS> update(@RequestBody HORARIOS newHorario, @PathVariable long id) {
        return horariosRepository.findById(id).map(horario -> {
            horario.setFecha(newHorario.getFecha());
            horario.setHoraEntrada(newHorario.getHoraEntrada());
            horario.setHoraSalida(newHorario.getHoraSalida());
            horario.setMinutosPau(newHorario.getMinutosPau());
            horario.setMinutosTot(Duration.between(newHorario.getHoraEntrada(), newHorario.getHoraSalida()).toMinutes()- newHorario.getMinutosPau());
            horario.setMinutosExt(Duration.between(newHorario.getHoraEntrada(), newHorario.getHoraSalida()).toMinutes()- newHorario.getMinutosPau()-480);
            horario.setJornada(newHorario.getJornada());
            return ResponseEntity.ok(horariosRepository.save(horario));
        }).orElseGet(() -> {
            newHorario.setId(id);
            return ResponseEntity.ok(horariosRepository.save(newHorario));
        });
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/horarios/{id}")
    ResponseEntity<?> delete(@PathVariable Long id) {
        return horariosRepository.findById(id).map(horario -> {
            horariosRepository.delete(horario);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

}