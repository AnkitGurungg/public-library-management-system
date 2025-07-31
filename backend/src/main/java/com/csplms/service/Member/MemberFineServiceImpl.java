package com.csplms.service.Member;

import com.csplms.dto.responseDto.MemberFineDto;
import com.csplms.entity.User;
import com.csplms.exception.UserNotPresentException;
import com.csplms.repository.FineRepository;
import com.csplms.repository.UserRepository;
import com.csplms.util.GetAuthUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class MemberFineServiceImpl implements MemberFineService {

    private final GetAuthUserUtil getAuthUserUtil;
    private final UserRepository userRepository;
    private final FineRepository fineRepository;


    @Autowired
    public MemberFineServiceImpl(GetAuthUserUtil getAuthUserUtil, UserRepository userRepository, FineRepository fineRepository) {
        this.getAuthUserUtil = getAuthUserUtil;
        this.userRepository = userRepository;
        this.fineRepository = fineRepository;
    }

    @Override
    public Page<MemberFineDto> getMemberFines(int page, int size, String title, Integer categoryId, Boolean extended, Boolean paid) {
        String email = getAuthUserUtil.getAuthUser();
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new UserNotPresentException("User not found"));

        Pageable pageable = PageRequest.of(page, size);
        return fineRepository.findFinesByUserId(
                pageable,
                user.getUserId(),
                title,
                categoryId,
                extended,
                paid
        );
    }

}
