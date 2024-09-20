package ucube.com.manage.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ucube.com.manage.model.Contract;
import ucube.com.manage.model.ProjectInfo;
import ucube.com.manage.service.ContractService;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/contract")
@Slf4j
public class ContractController {

  private final ContractService contractService;

  private HashMap<String, Object> map = new HashMap<String, Object>();

  // 프로젝트 정보 조회
  @GetMapping("/projectList")
  public ResponseEntity<?> projectList() {
    try {
      List<ProjectInfo> list = contractService.projectList();

      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // BP사 정보 조회
  @GetMapping("/companyList")
  public ResponseEntity<?> companyList() {
    try {
      List<ProjectInfo> list = contractService.companyList();

      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 전체 조회
  @GetMapping("/list")
  public ResponseEntity<?> findAll() {
    try {
      List<Contract> list = contractService.ContractList();

      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 상세 조회
  @GetMapping("/list/{contract_idx}")
  public ResponseEntity<?> findDetail(@PathVariable("contract_idx") String contract_idx) {

    Optional<Contract> Contract = contractService.ContractQuery(contract_idx);
    if (Contract.isPresent()) {
      return new ResponseEntity<>(Contract.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  // like 조회
  @GetMapping("/like")
  public ResponseEntity<?> findLikeNm(@RequestParam("pjtNo") String pjtNo,
      @RequestParam("companyNm") String companyNm) {

    map.put("pjtNo", pjtNo);
    map.put("companyNm", companyNm);

    try {
      List<Contract> list = contractService.ContractLikeList(map);
      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 저장 하기
  @PostMapping("/save")
  public ResponseEntity<?> save(@RequestBody Contract Contract) {
    try {
      return new ResponseEntity<>(contractService.ContractSave(Contract), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 수정 하기
  @PutMapping("/update")
  public ResponseEntity<?> update(@RequestBody Contract Contract) {
    try {
      return new ResponseEntity<>(contractService.ContractUpdate(Contract), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 삭제 하기
  @DeleteMapping("/delete/{contract_idx}")
  public ResponseEntity<?> delete(@PathVariable("contract_idx") String contract_idx) {
    try {
      return new ResponseEntity<>(contractService.ContractDelete(contract_idx), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
