package ucube.com.manage.controller;

import java.util.HashMap;
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
import lombok.extern.slf4j.Slf4j;
import ucube.com.manage.model.Assign;
import ucube.com.manage.service.AssignService;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/assign")
@Slf4j
public class AssignController {

  private final AssignService assignService;

  private HashMap<String, Object> map = new HashMap<String, Object>();

  // bp인력 전체조회
  @GetMapping("/assignBpPersonList/{pjtNo}/{companyNo}")
  public ResponseEntity<?> findBpPersonAll(@PathVariable("pjtNo") String pjtNo, @PathVariable("companyNo") String companyNo) {
    try {
      List<Assign> list = assignService.BpPersonList(pjtNo, companyNo);

      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // bp인력 조회
  @GetMapping("/assignBpPerson/{pjtNo}/{companyNo}/{bpPerson}")
  public ResponseEntity<?> findBpPerson(@PathVariable("pjtNo") String pjtNo, @PathVariable("companyNo") String companyNo, @PathVariable("bpPerson") String bpPerson) {

    Optional<Assign> assign = assignService.BpPerson(pjtNo, companyNo, bpPerson);
    if (assign.isPresent()) {
      return new ResponseEntity<>(assign.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  // 전체 조회
  @GetMapping("/list/{assignMonth}")
  public ResponseEntity<?> findAll(@PathVariable("assignMonth") String assignMonth) {
    try {
      List<Assign> list = assignService.AssignList(assignMonth);

      if (list.isEmpty() || list.size() == 0) {
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
      }
      return new ResponseEntity<>(list, HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 상세 조회
  @GetMapping("/list/{assign_idx}/{assignMonth}")
  public ResponseEntity<?> findDetail(@PathVariable("assign_idx") String assign_idx, @PathVariable("assignMonth") String assignMonth) {
    map.put("assign_idx", assign_idx);
    map.put("assignMonth", assignMonth);

    Optional<Assign> assign = assignService.AssignQuery(map);
    if (assign.isPresent()) {
      return new ResponseEntity<>(assign.get(), HttpStatus.OK);
    }
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  // like 조회
  @GetMapping("/like")
  public ResponseEntity<?> findLikeNm(@RequestParam("assignMonth") String assignMonth,
      @RequestParam("pjtNo") String pjtNo,  @RequestParam("companyNm") String companyNm,  @RequestParam("bpPerson") String bpPerson) {

    map.put("assignMonth", assignMonth);
    map.put("pjtNo", pjtNo);
    map.put("companyNm", companyNm);
    map.put("bpPerson", bpPerson);

    try {
      List<Assign> list = assignService.AssignLikeList(map);
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
  public ResponseEntity<?> save(@RequestBody Assign assign) {
    try {
      return new ResponseEntity<>(assignService.AssignSave(assign), HttpStatus.CREATED);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 수정 하기
  @PutMapping("/update")
  public ResponseEntity<?> update(@RequestBody Assign assign) {
    try {
      return new ResponseEntity<>(assignService.AssignUpdate(assign), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 삭제 하기
  @DeleteMapping("/delete/{assign_idx}/{assignMonth}")
  public ResponseEntity<?> delete(@PathVariable("assign_idx") String assign_idx, @PathVariable("assignMonth") String assignMonth) {
    map.put("assign_idx", assign_idx);
    map.put("assignMonth", assignMonth);

    try {
      return new ResponseEntity<>(assignService.AssignDelete(map), HttpStatus.OK);
    } catch (Exception e) {
      return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
