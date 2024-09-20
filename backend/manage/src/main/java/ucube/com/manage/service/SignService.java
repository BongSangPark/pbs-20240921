package ucube.com.manage.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ucube.com.manage.mapper.SignMapper;
import ucube.com.manage.model.Sign;

@Service
@RequiredArgsConstructor
@Slf4j
public class SignService {
  private final SignMapper signMapper;

  public List<Sign> signList(String signMonth) {
    return signMapper.listSign(signMonth);
  }

  public Optional<Sign> signQuery(HashMap map) {
    return signMapper.findById(map);
  }

  public List<Sign> signLikeList(HashMap map) {
    return signMapper.listLikeSign(map);
  }

  public int signSave(Sign sign) {
    return signMapper.saveSign(sign);
  }

  public int signUpdate(Sign sign) {
    return signMapper.updateSign(sign);
  }

  public int signDelete(HashMap map) {
    return signMapper.deleteSign(map);
  }
}
