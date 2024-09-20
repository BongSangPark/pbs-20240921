package ucube.com.manage.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import ucube.com.manage.model.Company;
import ucube.com.manage.service.CompanyService;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/company")
public class CompanyController {

  private final CompanyService companyService;

  // 전체 조회
  @GetMapping("/list")
  public ResponseEntity<?> findAll() {
    try {
      List<Company> list = companyService.companyList();

      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 한건 조회
  @GetMapping("/list/{companyNo}")
  public ResponseEntity<?> findById(@PathVariable("companyNo") String companyNo) {
    Optional<Company> company = companyService.companyQuery(companyNo);

    if (company.isPresent()) {
      return new ResponseEntity<>(company.get(), HttpStatus.OK);

    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  // like 조회
  @GetMapping("/like")
  public ResponseEntity<?> findLikeNm(@RequestParam("companyNm") String companyNm) {
    try {
      List<Company> list = companyService.companyLikelist(companyNm);

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
  public ResponseEntity<?> save(@RequestBody Company company) {
    try {
      return new ResponseEntity<>(companyService.companySave(company), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 수정 하기
  @PutMapping("/update")
  public ResponseEntity<?> update(@RequestBody Company company) {
    try {
      return new ResponseEntity<>(companyService.companyUpdate(company), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 삭제 하기
  @DeleteMapping("/delete/{companyNo}")
  public ResponseEntity<?> delete(@PathVariable("companyNo") String companyNo) {
    try {
      return new ResponseEntity<>(companyService.companyDelete(companyNo), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
