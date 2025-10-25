package com.example.projeto.controller;

import java.util.List;  
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.http.ResponseEntity;  
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;  
import org.springframework.web.bind.annotation.RequestBody;   

import com.example.projeto.service.PessoaService;
import com.example.projeto.model.Pessoa;

@RestController
@RequestMapping("/api/pessoas")
@CrossOrigin(origins = "*")
public class PessoaController {

    private final PessoaService pessoaService;

    public PessoaController(PessoaService pessoaService){
        this.pessoaService = pessoaService;
    }

    @GetMapping
    public ResponseEntity<List<Pessoa>> listarPessoas() {
        List<Pessoa> pessoas = pessoaService.listarPessoas();
        return ResponseEntity.ok(pessoas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pessoa> buscarPessoa(@PathVariable Long id){
        return pessoaService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Pessoa> criarPessoa(@RequestBody Pessoa pessoa){
        Pessoa novaPessoa = pessoaService.salvarPessoa(pessoa);
        return ResponseEntity.ok(novaPessoa);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPessoa(@PathVariable Long id){
        pessoaService.deletarPessoa(id);
        return ResponseEntity.noContent().build();
    }
}
